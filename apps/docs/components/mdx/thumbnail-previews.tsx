'use client';

import * as React from 'react';
import { Button, Checkbox, InputField, Radio, Switch, Textarea, Text, Image } from '@ideasui/react';
import { Mail } from 'lucide-react';

interface ThumbnailPreviewProps {
  readonly name: string;
  readonly title: string;
  readonly DemoComponent?: React.ComponentType;
}

export function ComponentThumbnailPreview({
  name,
  title,
  DemoComponent,
}: Readonly<ThumbnailPreviewProps>) {
  switch (name) {
    case 'button': {
      return (
        <Button color="primary" size="md" variant="solid">
          Click me
        </Button>
      );
    }

    case 'button-group':
    case 'buttongroup': {
      return (
        <Button.Group color="primary" size="sm" variant="outline">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      );
    }

    case 'checkbox': {
      return (
        <div className="flex flex-col gap-2.5">
          <Checkbox defaultSelected size="sm">
            Accept terms
          </Checkbox>
          <Checkbox size="sm">Email updates</Checkbox>
        </div>
      );
    }

    case 'input-field':
    case 'inputfield': {
      return (
        <div className="w-full max-w-[210px]">
          <InputField
            label="Email"
            placeholder="you@example.com"
            size="sm"
            startContent={<Mail className="text-content-tertiary h-3.5 w-3.5" />}
          />
        </div>
      );
    }

    case 'radio': {
      return (
        <div className="flex flex-col gap-2">
          <Radio defaultSelected size="sm" value="opt1">
            Option 1
          </Radio>
          <Radio size="sm" value="opt2">
            Option 2
          </Radio>
        </div>
      );
    }

    case 'switch': {
      return (
        <div className="flex flex-col gap-2.5">
          <Switch defaultSelected size="sm">
            Notifications
          </Switch>
          <Switch size="sm">Airplane mode</Switch>
        </div>
      );
    }

    case 'textarea': {
      return (
        <div className="w-full max-w-[210px]">
          <Textarea
            label="Biography"
            minRows={2}
            placeholder="Tell us about yourself..."
            size="sm"
          />
        </div>
      );
    }

    case 'image': {
      return (
        <div className="border-border-subtle/80 bg-surface relative overflow-hidden rounded-xl border shadow-xs">
          <Image
            alt="IdeasUI Image preview"
            height={90}
            radius="md"
            src="/IdeasUI-og-image.png"
            style={{ width: 140, height: 84, objectFit: 'cover' }}
            width={140}
          />
        </div>
      );
    }

    case 'text': {
      return (
        <div className="flex flex-col items-center gap-1 text-center">
          <Text color="primary" size="lg" variant="h4" weight="bold">
            Typography
          </Text>
          <Text color="tertiary" size="xs" variant="body">
            Accessible & type-safe
          </Text>
        </div>
      );
    }

    default: {
      if (DemoComponent) {
        return (
          <div className="flex w-full max-w-[210px] items-center justify-center overflow-hidden [&_.w-80]:w-full [&_.w-80]:max-w-[210px]">
            <DemoComponent />
          </div>
        );
      }

      return <span className="text-content-tertiary font-mono text-xs font-semibold">{title}</span>;
    }
  }
}
