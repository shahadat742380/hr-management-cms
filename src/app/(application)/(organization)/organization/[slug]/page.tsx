"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
// import core package
import { useEffect, useMemo, useState } from "react";

// import third party package
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Typography } from "@/components/typography";
// import component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvitationDataTable } from "./_component/invitation/data-table";
import { InvitationTableColumns } from "./_component/invitation/data-table/table-columns";
import Loader from "./_component/loader";
import { MemberDataTable } from "./_component/member/data-table";
import { MemberTableColumns } from "./_component/member/data-table/table-columns";
import InviteMember from "./_component/modal/invite-member-popup";

// import lib
import { authClient } from "@/lib/auth-client";

import { IcoHome } from "@/assets/icons";
// import types
import { OrganizationData } from "@/types/common";

// Enhanced fetch function with proper type conversions
const fetchOrganization = async (
  organizationSlug: string
): Promise<OrganizationData | null> => {
  try {
    const response = await authClient.organization.getFullOrganization({
      query: {
        organizationSlug: organizationSlug,
      },
    });

    if (!response?.data) throw new Error("Invalid response");

    // Define role priority for sorting
    const rolePriority: Record<string, number> = {
      owner: 1,
      admin: 2,
      member: 3,
    };

    // Sort members by role priority
    const sortedMembers = response.data.members.sort(
      (a, b) => (rolePriority[a.role] || 4) - (rolePriority[b.role] || 4)
    );
    // Sort members by role priority
    const sortedInvitations = response.data.invitations.sort(
      (a, b) => (rolePriority[a.role] || 4) - (rolePriority[b.role] || 4)
    );

    // Convert all Date objects to ISO strings and handle image undefined
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt).toISOString(),
      members: sortedMembers.map((member) => ({
        ...member,
        createdAt: new Date(member.createdAt).toISOString(),
        // Create a complete user object
        user: {
          id: member.userId, // Use the member's userId as the user's id
          name: member.user?.name || "",
          email: member.user?.email || "",
          image: member.user?.image || null,
        },
      })),
      invitations: sortedInvitations.map((invite) => ({
        ...invite,
        expiresAt: new Date(invite.expiresAt).toISOString(),
      })),
    };
  } catch (error) {
    console.log("Error fetching organization:", error);
    return null;
  }
};

const SingleOrganization = () => {
  const params = useParams<{ slug: string }>();
  const organizationSlug = params.slug;
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || "";

  // State management
  const [organization, setOrganization] = useState<OrganizationData | null>(
    null
  );
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleRefetch = () => setRefetch(!refetch);

  const isOwner = useMemo(() => {
    if (!organization || !userId) return false;
    return organization.members.some(
      (member) => member.userId === userId && member.role === "owner"
    );
  }, [organization, userId]);

  const isAdmin = useMemo(() => {
    if (!organization || !userId) return false;
    return organization.members.some(
      (member) => member.userId === userId && member.role === "admin"
    );
  }, [organization, userId]);

  // Fetch organization data on component mount
  useEffect(() => {
    const getOrganization = async () => {
      if (!organizationSlug) {
        setError("Organization Slug is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await fetchOrganization(organizationSlug);
        if (data) {
          const members = data.members.map((item) => ({ ...item, isOwner }));
          const invitations = data.invitations.map((item) => ({
            ...item,
            isOwner,
            isAdmin,
          }));

          setOrganization({ ...data, members, invitations });
          await authClient.organization.setActive({
            organizationId: data.id,
          });
        } else {
          setError("Failed to load organization data.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getOrganization();
  }, [organizationSlug, isOwner, refetch, isAdmin]);

  console.log(organization);

  // Handle loading and error states
  if (loading) return <Loader />;
  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-center font-bold text-2xl text-red-500">{error}</p>
      </div>
    );
  if (!organization)
    return <p className="text-center text-primary">Organization not found.</p>;

  return (
    <div className="w-full container mx-auto py-10 section-padding">
      <div className="mb-4 flex items-center gap-x-2">
        <Link href={"/"}>
          <IcoHome />
        </Link>
        <ChevronRight /> <p className="text-muted-foreground">Organization</p>{" "}
        <ChevronRight />
        <p className="font-medium">{organization.name}</p>
      </div>

      {/* Tabs for Members & Invitations */}
      <Tabs defaultValue="members">
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <TabsList>
              <TabsTrigger value="members" className="md:px-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Members
              </TabsTrigger>
              <TabsTrigger value="invitations" className="md:px-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Invitations
              </TabsTrigger>
            </TabsList>
          </div>
          <div>
            <InviteMember
              organizationId={organization.id}
              refetch={handleRefetch}
            />
          </div>
        </div>

        {/* Members List */}
        <TabsContent value="members">
          <div>
            <MemberDataTable
              data={organization.members.map((member) => ({
                ...member,
                name: member?.user?.name,
              }))}
              columns={MemberTableColumns.map((col) => ({
                ...col,
                meta: {
                  ...col.meta,
                  mutate: handleRefetch,
                },
              }))}
              refetch={handleRefetch}
            />
          </div>
        </TabsContent>

        {/* Invitations List */}
        <TabsContent value="invitations">
          <div>
            <InvitationDataTable
              data={organization.invitations}
              columns={InvitationTableColumns.map((col) => ({
                ...col,
                meta: {
                  ...col.meta,
                  mutate: handleRefetch,
                },
              }))}
              refetch={handleRefetch}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SingleOrganization;
