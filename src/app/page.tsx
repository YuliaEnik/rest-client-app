import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>this is our new progect</h2>
      <Link href="/restapi" passHref>
        <Button className="bg-secondary-red hover:bg-hover-buttons">
          RestApi page
        </Button>
      </Link>
      <Link href="/variables" passHref>
        <Button className="bg-secondary-red hover:bg-hover-buttons">
          Variables page
        </Button>
      </Link>
      <Link href="/history" passHref>
        <Button className="bg-secondary-red hover:bg-hover-buttons">
          History page
        </Button>
      </Link>
    </div>
  );
}
