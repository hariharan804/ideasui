import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AvatarProps } from '../src';

import { Avatar, AvatarFallback, AvatarGroup, AvatarIcon, AvatarImage } from '../src';

const UserIcon = () => (
  <svg aria-hidden="true" fill="currentColor" height="60%" viewBox="0 0 24 24" width="60%">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => <Avatar name="Jane Doe" src="/user.jpg" />,
};

// ── Initials Fallback ───────────────────────────────────────────
export const InitialsFallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Jane Doe" />
      <Avatar color="primary" name="John Smith" />
      <Avatar color="success" name="Alice B" />
      <Avatar color="warning" name="X" />
    </div>
  ),
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <Avatar key={variant} color="primary" name="JD" variant={variant} />
      ))}
    </div>
  ),
};

// ── All Color Schemes ───────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
            <Avatar key={color} color={color} name="JD" variant={variant} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} color="primary" name="JD" size={size} />
      ))}
    </div>
  ),
};

// ── Shapes ──────────────────────────────────────────────────────
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar color="primary" name="JD" shape="circle" size="lg" />
      <Avatar color="primary" name="JD" shape="square" size="lg" />
    </div>
  ),
};

// ── Bordered ────────────────────────────────────────────────────
export const Bordered: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      {(['primary', 'success', 'warning', 'danger'] as const).map((color) => (
        <Avatar key={color} isBordered color={color} name="JD" size="lg" />
      ))}
    </div>
  ),
};

// ── Icon Fallback ───────────────────────────────────────────────
export const IconFallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar aria-label="Unknown user" color="neutral" size="md">
        <AvatarFallback>
          <AvatarIcon>
            <UserIcon />
          </AvatarIcon>
        </AvatarFallback>
      </Avatar>
      <Avatar aria-label="Unknown user" color="primary" size="lg">
        <AvatarFallback>
          <AvatarIcon>
            <UserIcon />
          </AvatarIcon>
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

// ── SVG Image ──────────────────────────────────────────────────
export const SvgImage: Story = {
  render: () => {
    const BotSvg = () => (
      <svg aria-hidden="true" fill="currentColor" height="80%" viewBox="0 0 24 24" width="80%">
        <rect height="8" rx="2" width="10" x="7" y="2" />
        <circle cx="9.5" cy="6" fill="white" r="1" />
        <circle cx="14.5" cy="6" fill="white" r="1" />
        <rect height="9" rx="3" width="16" x="4" y="12" />
        <rect height="2" width="2" x="11" y="1" />
      </svg>
    );

    return (
      <div className="flex items-center gap-3">
        <Avatar color="primary" name="Bot" size="lg">
          <AvatarImage>
            <BotSvg />
          </AvatarImage>
        </Avatar>
        <Avatar color="neutral" name="Bot" size="lg">
          <AvatarFallback>
            <BotSvg />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  },
};

// ── Next.js Image Simulation ───────────────────────────────────
export const NextJsImage: Story = {
  render: () => {
    const NextImageRenderer = ({
      src,
      alt,
      className,
    }: {
      src?: string;
      alt?: string;
      className?: string;
    }) => <img alt={alt ?? ''} className={className} src={src} style={{ objectFit: 'cover' }} />;

    return (
      <div className="flex items-center gap-3">
        <Avatar name="Jane Doe" size="md">
          <AvatarImage
            alt="Jane Doe"
            as={({ src, alt, className }) => (
              <NextImageRenderer alt={alt} className={className} src={src} />
            )}
            src="/user.jpg"
          />
        </Avatar>
        <Avatar name="John Smith" size="lg">
          <AvatarImage
            alt="John Smith"
            as={({ src, alt, className }) => (
              <NextImageRenderer alt={alt} className={className} src={src} />
            )}
            src="/user2.jpg"
          />
        </Avatar>
      </div>
    );
  },
};

// ── Disabled ────────────────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar isDisabled name="Jane Doe" />
      <Avatar isDisabled name="Jane Doe" src="/user.jpg" />
    </div>
  ),
};

// ── AvatarGroup — Basic ─────────────────────────────────────────
export const Group: Story = {
  render: () => (
    <AvatarGroup label="Team members">
      <Avatar name="Alice" src="/a.jpg" />
      <Avatar name="Bob" src="/b.jpg" />
      <Avatar name="Carol" src="/c.jpg" />
      <Avatar color="primary" name="Dave" />
    </AvatarGroup>
  ),
};

// ── AvatarGroup — With Max Overflow ────────────────────────────
export const GroupWithOverflow: Story = {
  render: () => (
    <AvatarGroup label="Team members" max={3}>
      <Avatar color="primary" name="Alice" />
      <Avatar color="success" name="Bob" />
      <Avatar color="warning" name="Carol" />
      <Avatar color="danger" name="Dave" />
      <Avatar color="neutral" name="Eve" />
    </AvatarGroup>
  ),
};

// ── AvatarGroup — All Sizes ─────────────────────────────────────
export const GroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <AvatarGroup key={size} label={`Size ${size}`} size={size}>
          <Avatar color="primary" name="Alice" />
          <Avatar color="success" name="Bob" />
          <Avatar color="warning" name="Carol" />
        </AvatarGroup>
      ))}
    </div>
  ),
};

// ── AvatarGroup — Bordered ──────────────────────────────────────
export const GroupBordered: Story = {
  render: () => (
    <AvatarGroup isBordered label="Bordered group" max={4}>
      <Avatar color="primary" name="Alice" />
      <Avatar color="success" name="Bob" />
      <Avatar color="warning" name="Carol" />
      <Avatar color="danger" name="Dave" />
      <Avatar color="neutral" name="Eve" />
    </AvatarGroup>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'soft',
    color: 'neutral',
    size: 'md',
    shape: 'circle',
    isBordered: false,
    isDisabled: false,
    name: 'Jane Doe',
  },
  render: (arguments_: AvatarProps) => <Avatar {...arguments_} />,
};
