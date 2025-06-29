export default function CategoryTable({ categories }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category, index) => (
            <tr className="border-b bg-gray-900 border-gray-800" key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                {category.cat_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
