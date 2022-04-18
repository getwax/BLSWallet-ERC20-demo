import { useStoreState } from "../store";

const Contract = () => {
  const { contract, spender } = useStoreState((state) => state);
  // const setContract = useStoreActions((actions) => actions.setContract);

  // const [updatedContract, setUpdatedContract] = useState("");

  return (
    <div className="bg-slate-100 p-5 rounded-xl flex flex-col gap-1">
      {/* <input
        type="contract"
        onChange={(e) => setUpdatedContract(e.target.value)}
      />
      <button
        onClick={() => {
          if (updatedContract !== "") {
            setContract(updatedContract);
          }
        }}
      >
        Set Token Contract
      </button> */}
      <div className="text-sm font-medium">TOKEN: {contract}</div>
      <div className="text-sm font-medium">SPENDER: {spender}</div>
    </div>
  );
};

export default Contract;
