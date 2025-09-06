/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainGrid, MainRow, MainCol } from '../../components/MainGrid';

// Minimal module augmentation to expose toHaveClass typing if tsconfig types omission blocks it
// (Runtime matcher already injected by importing '@testing-library/jest-dom')
declare module '@jest/globals' {
  interface Matchers<R> {
    toHaveClass(...classNames: string[]): R;
  }
}

describe('MainGrid helpers', () => {
  test('MainGrid with page flag adds cds--grid and uc-page classes', () => {
    render(<MainGrid page>GridContent</MainGrid>);
    const el = screen.getByText('GridContent');
  (expect(el) as any).toHaveClass('cds--grid', 'uc-page');
  });

  test('MainCol spans and offset produce correct classes', () => {
    render(
      <MainGrid>
        <MainRow>
          <MainCol sm={4} lg={8} offsetLg={2}>ColContent</MainCol>
        </MainRow>
      </MainGrid>
    );
    const col = screen.getByText('ColContent');
  (expect(col) as any).toHaveClass('cds--col-sm-4', 'cds--col-lg-8', 'cds--offset-lg-2');
  });

  test('MainCol with no spans defaults to fluid cds--col', () => {
    render(
      <MainGrid>
        <MainRow>
          <MainCol>DefaultCol</MainCol>
        </MainRow>
      </MainGrid>
    );
    const col = screen.getByText('DefaultCol');
  (expect(col) as any).toHaveClass('cds--col');
  });

  test('MainRow renders cds--row class', () => {
    render(
      <MainGrid>
        <MainRow>RowContent</MainRow>
      </MainGrid>
    );
    const row = screen.getByText('RowContent');
  (expect(row) as any).toHaveClass('cds--row');
  });

  test('MainGrid as prop and accessible region labeling', () => {
    render(
      <MainGrid as="section" role="region" ariaLabel="Main region">
        RegionContent
      </MainGrid>
    );
    const region = screen.getByRole('region', { name: 'Main region' });
    expect(region.tagName).toBe('SECTION');
  (expect(region) as any).toHaveClass('cds--grid');
  });

  test('MainGrid aria-labelledby chain provides accessible name', () => {
    render(
      <MainGrid as="section" role="region" ariaLabelledby="title-x">
        <h2 id="title-x">Başlık Metni</h2>
        İçerik
      </MainGrid>
    );
    const region = screen.getByRole('region', { name: /başlık metni/i });
  (expect(region) as any).toHaveClass('cds--grid');
  });

  test('MainCol with fluid=false does not add base col class', () => {
    render(
      <MainGrid>
        <MainRow>
          <MainCol fluid={false}>NoFluid</MainCol>
        </MainRow>
      </MainGrid>
    );
    const col = screen.getByText('NoFluid');
  (expect(col) as any).not.toHaveClass('cds--col');
  });

  test('MainCol multiple breakpoint and offset classes applied', () => {
    render(
      <MainGrid>
        <MainRow>
          <MainCol
            sm={2}
            md={6}
            lg={8}
            xlg={12}
            max={16}
            offsetSm={1}
            offsetMd={2}
            offsetLg={3}
            offsetXlg={4}
            offsetMax={5}
          >
            Multi
          </MainCol>
        </MainRow>
      </MainGrid>
    );
    const col = screen.getByText('Multi');
  (expect(col) as any).toHaveClass(
      'cds--col-sm-2',
      'cds--col-md-6',
      'cds--col-lg-8',
      'cds--col-xlg-12',
      'cds--col-max-16',
      'cds--offset-sm-1',
      'cds--offset-md-2',
      'cds--offset-lg-3',
      'cds--offset-xlg-4',
      'cds--offset-max-5'
    );
  });
});
