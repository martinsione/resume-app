import ExternalLink from "@components/ExternalLink";
interface Props {
  started: number;
  title: string;
  description?: string;
  ended?: number;
  href?: string;
}

export default function Timeline({ started, title, description, ended, href }: Props) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="relative sm:mr-40">
        <span className="whitespace-nowrap text-zinc-400 sm:absolute">
          {started} - {ended || "Now"}
        </span>
      </div>
      <div>
        {href ? <ExternalLink href={href}>{title}</ExternalLink> : <h4>{title}</h4>}
        <p className="prose text-sm">{description}</p>
      </div>
    </div>
  );
}
