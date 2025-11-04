// "use client";

// import { updateBookStatusAction } from "@/actions/books";
// import clsx from "clsx";
// import React, { useActionState } from "react";
// import { useFormStatus } from "react-dom";

// type BookStatus = "READ" | "READING" | "PLAN_TO_READ";

// interface StatusButtonProps {
//   bookId: string;
//   currentStatus: BookStatus;
// }

// const SubmitButton = ({
//   children,
//   targetStatus,
// }: {
//   children: React.ReactNode;
//   targetStatus: BookStatus;
// }) => {
//   const { pending } = useFormStatus();
//   const statusClass = clsx(
//     "text-xs px-2 py-1 rounded-md w-full transition font-semibold",
//     {
//       "bg-green-600 hover:bg-green-700 cursor-pointer": targetStatus === "READ",
//       "bg-orange-500 hover:bg-orange-700 cursor-pointer":
//         targetStatus === "READING",
//       "bg-gray-600 hover:bg-gray-700 cursor-pointer":
//         targetStatus === "PLAN_TO_READ",
//     }
//   );
//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className={`text-white ${statusClass}`}
//     >
//       {pending ? "Updating..." : children}
//     </button>
//   );
// };

// export default function BookStatusButton({
//   bookId,
//   currentStatus,
// }: StatusButtonProps) {
//   const allStatuses: BookStatus[] = ["READ", "READING", "PLAN_TO_READ"];
//   return (
//     <div className="flex flex-col gap-2 w-full p-2">
//       <p className="text-center text-sm font-bold mb-1 border-b border-orange-500 pb-1">
//         Current: <span className="text-orange-400">{currentStatus}</span>
//       </p>

//       <div className="flex flex-col gap-1">
//         {allStatuses.map((targetStatus) => {
//           const isCurrent = targetStatus === currentStatus;

//           if (isCurrent) {
//             return null;
//           }

//           let buttonLabel = `-> ${targetStatus} `;
//           if (targetStatus === "READ") {
//             buttonLabel = "I Read";
//           } else if (targetStatus === "READING") {
//             buttonLabel = " Reading";
//           } else if (targetStatus === "PLAN_TO_READ") {
//             buttonLabel = " Add Plan To Read";
//           }

//           const actionWithArgs = updateBookStatusAction.bind(
//             null,
//             bookId,
//             targetStatus
//           );
//           const [state, formAction] = useActionState(actionWithArgs, {
//             message: null,
//             success: false,
//           });

//           return (
//             <div key={targetStatus} className="w-full">
//               <form action={formAction}>
//                 <SubmitButton targetStatus={targetStatus}>
//                   {buttonLabel}
//                 </SubmitButton>
//               </form>

//               {state.message && (
//                 <p
//                   className={`mt-1 text-center text-xs ${
//                     state.success ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {state.message}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { updateBookStatusAction } from "@/actions/books";
import clsx from "clsx";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

type BookStatus = "READ" | "READING" | "PLAN_TO_READ";

interface StatusButtonProps {
  bookId: string;
  currentStatus: BookStatus;
}

const SubmitButton = ({
  children,
  targetStatus,
}: {
  children: React.ReactNode;
  targetStatus: BookStatus;
}) => {
  const { pending } = useFormStatus();
  const statusClass = clsx(
    "text-xs px-2 py-1 rounded-md w-full transition font-semibold",
    {
      "bg-green-600 hover:bg-green-700 cursor-pointer": targetStatus === "READ",
      "bg-orange-500 hover:bg-orange-700 cursor-pointer":
        targetStatus === "READING",
      "bg-gray-600 hover:bg-gray-700 cursor-pointer":
        targetStatus === "PLAN_TO_READ",
    }
  );
  return (
    <button
      type="submit"
      disabled={pending}
      className={`text-white ${statusClass}`}
    >
      {pending ? "Updating..." : children}
    </button>
  );
};

function BookStatusForm({
  bookId,
  targetStatus,
  buttonLabel,
}: {
  bookId: string;
  targetStatus: BookStatus;
  buttonLabel: string;
}) {
  const actionWithArgs = updateBookStatusAction.bind(
    null,
    bookId,
    targetStatus
  );
  const [state, formAction] = useActionState(actionWithArgs, {
    message: null,
    success: false,
  });

  return (
    <div className="w-full">
      <form action={formAction}>
        <SubmitButton targetStatus={targetStatus}>{buttonLabel}</SubmitButton>
      </form>

      {state.message && (
        <p
          className={`mt-1 text-center text-xs ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}

export default function BookStatusButton({
  bookId,
  currentStatus,
}: StatusButtonProps) {
  const allStatuses: BookStatus[] = ["READ", "READING", "PLAN_TO_READ"];

  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <p className="text-center text-sm font-bold mb-1 border-b border-orange-500 pb-1">
        Current: <span className="text-orange-400">{currentStatus}</span>
      </p>

      <div className="flex flex-col gap-1">
        {allStatuses.map((targetStatus) => {
          if (targetStatus === currentStatus) return null;

          let buttonLabel = `-> ${targetStatus}`;
          if (targetStatus === "READ") buttonLabel = "I Read";
          else if (targetStatus === "READING") buttonLabel = "Reading";
          else if (targetStatus === "PLAN_TO_READ")
            buttonLabel = "Add Plan To Read";

          return (
            <BookStatusForm
              key={targetStatus}
              bookId={bookId}
              targetStatus={targetStatus}
              buttonLabel={buttonLabel}
            />
          );
        })}
      </div>
    </div>
  );
}
