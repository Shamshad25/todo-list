import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { counterSelector, increment } from "../redux/feature/counterSlice";

const Counter = () => {
  const selectedCount = useAppSelector(counterSelector);
  console.log(selectedCount);
  const dispatch = useAppDispatch();

  return (
    <section>
      <p>Count : {selectedCount.count}</p>
      <button onClick={() => dispatch(increment())}>increment</button>
    </section>
  );
};

export default Counter;
