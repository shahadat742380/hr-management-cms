/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ReactNode } from "react";

//  For Routes**
export interface IParentRoutes {
  icon: React.ReactNode;
  href?: string;
  name: string;
  label: string;
  children?: IParentRoutes[];
}

//  Page  Configuration Type:
export interface IPageOptions {
  pageTitle: string;
  breadcrumbs: {
    label: string;
    href: string;
    active: boolean;
  }[];
  actions?: React.ReactNode;
}

export interface IOption {
  name: string;
  value: string;
  label?: string;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export type SingleOrganization = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  createdAt: Date;
  metadata?: Record<string, any> | null;
  refetch: () => void;
};

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

// Define member role type
export type MemberRole = "member" | "admin" | "owner";

export interface Member {
  id: string;
  role: MemberRole;
  createdAt: string;
  userId: string;
  organizationId: string;
  isOwner?: boolean;
  user: User;
}

export interface Invitation {
  id: string;
  email: string;
  role: MemberRole;
  status: string;
  expiresAt: string;
  organizationId: string;
  inviterId: string;
  isOwner?: boolean;
  isAdmin?: boolean;
}

export interface OrganizationData {
  id: string;
  name: string;
  slug: string;
  logo?: string | null; // Optional logo
  createdAt: string;
  members: Member[];
  invitations: Invitation[];
}
