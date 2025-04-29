import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import BreadcrumbNav from "../breadcrumb-nav";

function Nav() {
  const { t, i18n } = useTranslation("common");
  const { resolvedLanguage } = i18n;

  function changeLanguage(lang: "zh" | "en") {
    if (lang !== resolvedLanguage) {
      i18n.changeLanguage(lang, (err) => {
        if (err) {
          console.error("change language failed", err);
        } else {
          localStorage.setItem("i18nextLng", lang);
          location.reload();
        }
      });
    }
  }

  return (
    <div className="relative z-10 flex h-16 items-center justify-between p-2 shadow-[0px_3px_6px_#00202B33]">
      <div className="flex items-center">
        <div className="p-2 font-mono text-xl w-32">TSMC</div>
        <BreadcrumbNav  />
      </div>
      <div className="flex items-center">
        <span className="text-primary">Hi, Sandra</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-16 w-16 rounded-full">
              <MoreVertical className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>{t("language")}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={resolvedLanguage === "zh"}
                    onCheckedChange={() => changeLanguage("zh")}
                  >
                    繁體中文
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={resolvedLanguage === "en"}
                    onCheckedChange={() => changeLanguage("en")}
                  >
                    English
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Nav;
