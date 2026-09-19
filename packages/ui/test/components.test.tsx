import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Skeleton } from '../src/components/ui/skeleton';
import { cn } from '../src/lib/utils';

describe('@repo/ui Component Library', () => {
  describe('cn Utility Re-export', () => {
    it('should re-export cn from @repo/utils and merge Tailwind classes', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });
  });

  describe('Button Component', () => {
    it('should render button text correctly', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should trigger onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Submit</Button>);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should apply variant and size classes properly', () => {
      const { container } = render(<Button variant="outline" size="sm">Small Outline</Button>);
      const buttonEl = container.firstChild as HTMLElement;
      expect(buttonEl).toHaveClass('border');
    });
  });

  describe('Badge Component', () => {
    it('should render badge content', () => {
      render(<Badge>New Feature</Badge>);
      expect(screen.getByText('New Feature')).toBeInTheDocument();
    });

    it('should render badge with secondary variant', () => {
      const { container } = render(<Badge variant="secondary">Active</Badge>);
      const badgeEl = container.firstChild as HTMLElement;
      expect(badgeEl).toBeInTheDocument();
    });
  });

  describe('Skeleton Component', () => {
    it('should render skeleton loading state with pulse animation', () => {
      const { container } = render(<Skeleton className="h-4 w-20" />);
      const skeletonEl = container.firstChild as HTMLElement;
      expect(skeletonEl).toHaveClass('animate-pulse');
      expect(skeletonEl).toHaveClass('h-4');
      expect(skeletonEl).toHaveClass('w-20');
    });
  });
});
