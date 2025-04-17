export function Loader() {
  return (
    <div
      className={
        'fixed top-0 right-0 bottom-0 left-0 z-10 flex justify-center items-center bg-black/10'
      }
    >
      <div className={'relative flex justify-center items-center'}>
        <span
          className={
            'w-[100px] h-[100px] border-[4px] border-gray-100 border-t-lime-500 rounded-[50%] animate-spin'
          }
        ></span>
        <span className={'absolute'}>Loading...</span>
      </div>
    </div>
  );
}
