import { Icon } from '@mintlify/components';

const socials = [
  { type: 'github', url: 'https://sonicverse.tech/open-source' },
  { type: 'radio', url: 'https://sonicverse.tech' },
  { type: 'mail', url: 'https://sonicverse.tech/contact' },
];

const socialIconMap: Record<string, string> = {
  x: 'x-twitter',
  github: 'github',
  linkedin: 'linkedin',
  radio: 'radio',
  mail: 'mail',
};

export default function SiteFooter() {
  return (
    <footer className="footer-shell relative overflow-hidden border-t border-[rgba(16,18,20,0.1)] mt-24 -mx-4 px-4">
      <div
        className="absolute inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(181,31,46,0.28), transparent)',
        }}
      />
      <div className="flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/brand/signal-aperture-mark.svg"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 rounded-sm"
            />
            <p className="text-sm font-semibold tracking-[0.08em] uppercase text-[rgba(16,18,20,0.62)]">
              Sonicverse
            </p>
          </div>
          <h2 className="text-2xl font-semibold leading-[1.18] tracking-normal text-[#101214]">
            Open-source software for modern radio.
          </h2>
          <p className="text-sm leading-7 text-[rgba(16,18,20,0.62)]">
            The open broadcast stack - playout, scheduling, streaming, and
            station tooling, built by broadcasters and developers in the open.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          {socials.map((social) => {
            const iconName =
              socialIconMap[social.type.toLowerCase()] || social.type;
            return (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(16,18,20,0.12)] bg-white/70 text-[rgba(16,18,20,0.56)] transition-colors hover:border-[rgba(181,31,46,0.35)] hover:text-(--primary)"
                aria-label={social.type}
              >
                <Icon
                  icon={iconName}
                  iconLibrary="lucide"
                  size={18}
                  color="currentColor"
                />
              </a>
            );
          })}
        </div>
      </div>
      <div className="border-t border-[rgba(16,18,20,0.08)] py-5 text-sm text-[rgba(16,18,20,0.48)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sonicverse - MIT License</p>
          <a
            href="https://sonicverse.tech/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#101214]"
          >
            Get early access
          </a>
        </div>
      </div>
    </footer>
  );
}
