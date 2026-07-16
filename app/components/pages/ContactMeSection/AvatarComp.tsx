/* eslint-disable @next/next/no-img-element */
import React from "react";

/* ---------------------------------------------------------------------- */
/*  Types                                                                 */
/* ---------------------------------------------------------------------- */

interface Avatar {
  src: string;
  alt: string;
}

interface AvatarStackProps {
  avatars: Avatar[];
  size?: number; // diameter in px
  overlap?: number; // px each avatar overlaps the previous one
  ringColor?: string;
  className?: string;
}

/* ---------------------------------------------------------------------- */
/*  Data (placeholders — swap with real client photos)                    */
/* ---------------------------------------------------------------------- */

const DEFAULT_AVATARS: Avatar[] = [
  {
    src: "/images/stanley.png",
    alt: "Client headshot",
  },
  {
    src: "/images/stanley.png",
    alt: "Client headshot",
  },
  {
    src: "https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=300&auto=format&fit=crop",
    alt: "Client headshot",
  },
];

/* ---------------------------------------------------------------------- */
/*  Component                                                             */
/* ---------------------------------------------------------------------- */

export default function AvatarStack(){
  return (
    <div className={`flex items-center md:ml-3`} style={{ paddingLeft: 22 }}>
      <div className="flex items-center">
        {DEFAULT_AVATARS.map((avatar: Avatar, i: number) => (
          <div
            key={avatar.src + i}
            className="overflow-hidden rounded-full"
            style={{
              width: 40,
              height: 40,
              marginLeft: -22,
              border: `3px solid white`,
              boxSizing: "content-box",
              zIndex: DEFAULT_AVATARS.length - i,
              flexShrink: 0,
            }}
          >
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="text-white text-sm md:text-base ml-3 grid">
        <p>100+ People</p>
        <p>Loved working with John</p>
      </div>
    </div>
  );
}
