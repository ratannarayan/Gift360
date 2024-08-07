/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Button from './elements/Button';

export default function BrandIcon() {
  return (
    <Button
      className=""
      type="link"
      href="/"
    >
      <p className="text-theme-yellow text-4xl">
        360
        <span className="text-theme-yellow">Gifts</span>
      </p>
    </Button>
  );
}
