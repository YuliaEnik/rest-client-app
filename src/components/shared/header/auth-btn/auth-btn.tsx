import { Button } from '@/components/ui/button';
//import { signIn, signInWithEmail, signOut } from '@/lib/auth';

interface AuthButtonsProps {
  user: any;
  loading: boolean;
}

export function AuthButtons({ user, loading }: AuthButtonsProps) {
  if (loading) return null;

  return (
    <>
      {user ? (
        <Button
          //onClick={signOut}
          variant="default"
          size="sm"
          className={'bg-lime-300 text-black hover:bg-lime-200'}
        >
          Sign out
        </Button>
      ) : (
        <>
          <Button
            //onClick={signInWithEmail}
            variant="secondary"
            size="sm"
            className={'bg-lime-300 text-black  hover:bg-lime-200'}
          >
            Sing In
          </Button>
          <Button
            //onClick={signUp}
            variant="secondary"
            size="sm"
            className={'bg-lime-300 text-black  hover:bg-lime-200'}
          >
            Sing Up
          </Button>
        </>
      )}
    </>
  );
}
