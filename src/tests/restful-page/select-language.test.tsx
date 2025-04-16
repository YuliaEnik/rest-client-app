import { configure } from '@testing-library/dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SelectLanguage } from '@/components/restful/select-language';

const languageAction = vi.fn();

configure({
  testIdAttribute: 'data-slot',
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('SelectLanguage', () => {
  beforeEach(() => {
    render(<SelectLanguage setLanguageAction={languageAction} />);
  });
  afterEach(() => {
    cleanup();
  });

  it('Should render correctly', () => {
    const select = screen.getByRole('combobox');
    expect(select).toBeDefined();
  });
  it('Should change value', () => {
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    const options = screen.getAllByTestId('select-item');
    const optionValue = options[6].children[0].textContent;
    fireEvent.click(options[6]);
    expect(languageAction.mockReturnValue(optionValue));
  });
});
