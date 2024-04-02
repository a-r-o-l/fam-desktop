import { Divider, Title } from "@mantine/core";

export const HeaderTitle = ({ title, description }) => {
  return (
    <div className="w-full flex flex-col self-center justify-start bg-black rounded-md pl-5">
      <Title fz={55} fw={900} ff="heading" className="text-white">
        {title}
      </Title>
      <Title fz={25} fw={600} ff="heading" className="text-zinc-400">
        {description}
      </Title>
      <Divider my="md" mt={10} color="" />
    </div>
  );
};
