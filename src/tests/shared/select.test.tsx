import { configure } from '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectElement } from '@/components/shared/select';
import { Option } from '@/types/types';

configure({
  testIdAttribute: 'data-slot',
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Select component', () => {
  const options: Option[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ];
  const onChange = vi.fn();
  it('Should render select component', () => {
    const { container } = render(
      <SelectElement
        options={options}
        initialValue={options[0].value}
        handleChangeAction={onChange}
      />
    );
    expect(container).toBeDefined();
  });
  it('Should change value', () => {
    render(
      <SelectElement
        options={options}
        initialValue={options[0].value}
        handleChangeAction={onChange}
      />
    );
    const triggers = screen.getAllByRole('combobox');
    expect(triggers[0]).toBeDefined();
    fireEvent.click(triggers[0]);
    const selectOptions = screen.getAllByTestId('select-item');
    expect(selectOptions.length).toBe(options.length);
    fireEvent.click(selectOptions[2]);
    expect(triggers[0].children[0].textContent).toBe(options[2].value);
  });
});
