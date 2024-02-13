import React from "react";
import styles from "./styles.module.css";
import Discord from "@site/static/img/discord.svg";
import Twitter from "@site/static/img/twitter.svg";
import Github from "@site/static/img/githubMint.svg";

export const socials = [
  {
    name: "Twitter",
    description: "Follow Pragma on twitter.",
    href: "https://twitter.com/PragmaOracle",
  },
  {
    name: "Discord",
    description: "Hop in to the community on Discord.",
    href: "https://discord.com/invite/GFFymAvNQ6",
  },
  {
    name: "GitHub",
    description: "View all Pragma repositories & devs.",
    href: "https://github.com/Astraly-Labs",
  },
];

export default function SocialWrapper() {
  return (
    <div className={styles.socialWrapper}>
      {socials.map((social, index) => (
        <a key={index} className={styles.socialBox} href={social.href}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {index === 0 ? (
              <Twitter style={{ width: "30px" }} />
            ) : index === 1 ? (
              <Discord style={{ width: "30px", height: "40px" }} />
            ) : (
              <Github style={{ width: "30px" }} />
            )}
            <h4
              style={{
                paddingBottom: "0 !important",
                transform: "translateY(7px)",
              }}
            >
              {social.name}
            </h4>
          </div>
          <div className={styles.smallText}>{social.description}</div>
        </a>
      ))}
    </div>
  );
}
