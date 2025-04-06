import { VariableList } from '@/components';
import AddButton from '@/components/variable/add_var_button';
import { RefreshOnFocus } from '@/components/variable/refresh';

const VariablesPage = async () => {
  let date = new Date();
  return (
    <section className="flex flex-col items-center gap-4  p-4">
      <div className="flex flex-col items-center gap-4 border border-gray-300 rounded-lg  p-4">
        <h2>Variables</h2>
        <div className="flex flex-col items-center gap-4">
          <AddButton />
          <VariableList />
        </div>
      </div>
      <div>
        <p>This page was rendered at {date.toString()}</p>
        <RefreshOnFocus />
      </div>
    </section>
  );
};

export default VariablesPage;
