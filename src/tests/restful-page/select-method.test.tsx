import { configure } from '@testing-library/dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SelectMethod } from '@/components/restful/select-method';
import { RESTFUL_METHODS } from '@/constants/constants';

configure({
  testIdAttribute: 'data-slot',
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('SelectMethod', () => {
  beforeEach(() => {
    render(<SelectMethod currentMethod={'GET'} />);
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
    const methods = screen.getAllByTestId('select-item');
    expect(methods).toBeDefined();
    const fourthMethod = RESTFUL_METHODS[3];
    expect(select.children[0].textContent !== fourthMethod);
    fireEvent.click(methods[3]);
    expect(select.children[0].textContent === fourthMethod);
  });
  it('Should update url', () => {
    const initLocation = '/ru/GET';
    window.history.pushState(null, '', initLocation);
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    const methods = screen.getAllByTestId('select-item');
    const methodValue = methods[4].children[1].textContent;
    expect(methodValue).toBeDefined();
    expect(methodValue).toEqual(RESTFUL_METHODS[4]);
    fireEvent.click(methods[4]);
    const currentLocation = window.location.pathname;
    expect(currentLocation).not.toBe(initLocation);
    expect(currentLocation.includes(methodValue as string));
  });
});
