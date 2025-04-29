import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import i18n from "@/i18n"
import React, { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"

type BreadcrumbNavProps = {
  className?: string
}

const PAGE_NAME: Record<string, string> = {
  videos: i18n.t("videos", { ns: "common" }),
}

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const numberRegex = /^\d+$/

function BreadcrumbNav({ className }: Readonly<BreadcrumbNavProps>) {
  // 使用 useLocation 來獲取當前頁面的 URL
  const pathLocation = useLocation()
  const navigate = useNavigate()

  const [breadcrumbData, breadcrumbDataWithoutParams] = useMemo(() => {
    const pathArray = pathLocation.pathname.split("/").filter((x) => x)
    const pathArrayWithoutParams = pathLocation.pathname
      .split("/")
      .filter((x) => x && !uuidRegex.test(x) && !numberRegex.test(x))
    return [pathArray, pathArrayWithoutParams]
  }, [pathLocation])

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-base">
        {breadcrumbDataWithoutParams.map((x, index) => (
          <React.Fragment key={x}>
            {index === breadcrumbDataWithoutParams.length - 1 ? (
              <BreadcrumbPage className="flex text-primary">{PAGE_NAME[x]}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="cursor-pointer text-primary hover:text-[#A1CD56]"
                    onClick={() => {
                      if (index === breadcrumbDataWithoutParams.length - 1) return
                      const target_index = breadcrumbData.findIndex((breadcrumb) => breadcrumb === x)
                      navigate(`/${breadcrumbData.slice(0, target_index + 1).join("/")}`)
                    }}
                  >
                    {PAGE_NAME[x]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary" />
              </>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbNav
