import type { ReactNode } from "react";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
  children?: ReactNode;
};

// Root locale route: /aze, /en, /ru
// Buradan avtomatik /{locale}/home səhifəsinə yönləndiririk
export default async function LocaleIndexPage({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/home`);
}


