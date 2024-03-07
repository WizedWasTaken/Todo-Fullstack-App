import Nav from "@/components/non-reusable/header/NavComponent";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="p-5 flex flex-col justify-center items-center border-b-2 border-slate-400">
      <h1>{title}</h1>
      <Nav />
    </header>
  );
}
