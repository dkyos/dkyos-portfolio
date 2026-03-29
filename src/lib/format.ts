import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "yyyy년 M월 d일", { locale: ko });
}
