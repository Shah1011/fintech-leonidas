import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between font-inter">
          {children}
            <div className="fixed top-0 right-0 max-h-screen w-auto max-sm:hidden">
              <Image
                src="/icons/auth-image.jpg"
                alt="auth-image"
                width={600}
                height={800}
                className="object-cover max-h-screen"
              />
            </div>
      </main>
    );
  }
  