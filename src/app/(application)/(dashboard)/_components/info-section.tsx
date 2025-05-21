
// ** import components
import { Typography } from "@/components/typography";

const InfoSection = () => {
  const infoData = [
    {
      title: "Employees Onboarded",
      value: "147",
     
    },
    {
      title: "Active Employees",
      value: "132",
      
    },
    {
      title: "Payslips Auto-Scheduled",
      value: "132",
     
    },
    {
      title: "Payslips Sent",
      value: "128",
      
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
      {infoData.map((item) => (
        <div
          key={item.title}
          className="relative rounded-xl border bg-card px-6 py-5 shadow-md"
        >
          <div className="flex items-center justify-between">
            <Typography variant="Regular_P" className="text-foreground">
              {item.title}
            </Typography>
           
          </div>
          <Typography variant="Bold_H3" className="text-primary">
            {item.value}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
