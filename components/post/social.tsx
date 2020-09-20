import { TwitterShareButton } from "react-share";
import { FiTwitter } from "react-icons/fi";
import { BiCoffeeTogo } from "react-icons/bi";

type Props = {
  url: string;
  title: string;
};

export function PostSocial({ url, title }: Props) {
  return (
    <aside className="mb-6 flex align-center">
      <TwitterShareButton url={url} title={title}>
        <FiTwitter />
      </TwitterShareButton>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 outline-none"
        href="https://www.buymeacoffee.com/senlima"
      >
        <BiCoffeeTogo />
      </a>
    </aside>
  );
}
