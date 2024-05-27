import { cookies } from "next/headers"
import Image from "next/image"

import { InfoAssetCatalog } from "./components/info-asset-catalog"
import { accounts, info_assets } from "@/app/data"

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : [265, 440, 655]; // Providing a default layout array
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false; // Providing a default collapsed value

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <InfoAssetCatalog
          accounts={accounts}
          info_assets={info_assets}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={3}
        />
      </div>
    </>
  )
}
