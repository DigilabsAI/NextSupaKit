export type StatCard = {
  id: string;
  title: string;
  value: string;
  icon: string;
};

export const mockStats: StatCard[] = [
  {
    id: "1",
    title: "Stats 1",
    value: "67",
    icon: "users",
  },
  {
    id: "2",
    title: "Stats 2",
    value: "12",
    icon: "clipboard",
  },
  {
    id: "3",
    title: "Stats 3",
    value: "$4,571",
    icon: "wallet",
  },
  {
    id: "4",
    title: "Stats 4",
    value: "32",
    icon: "invoice",
  },
];
