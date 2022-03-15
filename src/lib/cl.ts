export default function cl(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
