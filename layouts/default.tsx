import { Meta } from "@components/meta";
import { Footer } from "@components/footer";

type Props = {
  children: React.ReactNode;
};

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
