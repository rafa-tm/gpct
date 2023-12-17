import { defineConfig } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  theme: {
    extend: {
      colors: {
        primary: {
          '500': '#338AF0',
          '700': '#2A72C6',
        },
        secondary: {
          '500': '#192B52',
          '700': '#132140',
        },
        tertiary: {
          '500': '#91BCF8',
          '700': '#709FDF',
        },
        danger: {
          '500': '#EF4444',
          '700': '#DC2626',
        },
        error: {
          '500': '#F21111',
          '700': '#AB0F0F',
        },
        success: '#4caf50',
        info: '#2196f3',
        warning: {
          '500': '#F2C94C',
          '700': '#F29F05',
        },
        light: '#FFFFFA',
        dark: '#161616',
      },
      fontFamily: {
        sans: 'Montserrat, sans-serif',
      },
      classNames: {
        'task-list-item': 'flex items-center gap-2',
        'contains-task-list': 'flex flex-col gap-2',
        'task-list-checkbox': 'w-5 h-5',
      },
    },
  },
});
