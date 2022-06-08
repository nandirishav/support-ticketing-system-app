export default function WidgetLg({ tickets }) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Recently Opened Tickets(Sort it later)</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Product</th>
            <th className="widgetLgTh">Description</th>
            <th className="widgetLgTh">Status</th>
            <th className="widgetLgTh">Created At</th>
            <th className="widgetLgTh">Due Date</th>
          </tr>
          {tickets.map((item, index) => {
            return (
              <tr key={index} className="widgetLgTr">
                <td className="widgetLgUser">
                  <span className="widgetLgName">{item.product}</span>
                </td>
                <td>
                  <span className="widgetLgDescription">
                    {item.description}
                  </span>
                </td>
                <td className="widgetLgStatus">
                  <Button type={item.status} />
                </td>
                <td className="widgetLgDate">
                  {new Date(item.createdAt).toLocaleDateString("en-US")}
                </td>
                <td className="widgetLgDate">
                  {new Date(item.dueDate).toLocaleDateString("en-US")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
