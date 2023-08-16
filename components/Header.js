import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto">
        <Link href="/">
          <span className="text-2xl font-bold uppercase tracking-wider cursor-pointer">SecretSkype</span>
        </Link>
      </div>
    </header>
  );
}