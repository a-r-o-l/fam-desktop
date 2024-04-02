import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentApiService } from "../../paymentApiService";

export const useUpdatePaymentMutation = (params, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => {
      return paymentApiService.updatePayment(params.id, params.data);
    },
    onMutate: (params) => {
      const originalData = queryClient.getQueryData(["getPayments"]);
      const newPayments = originalData.map((payment) => {
        if (payment.id === params.id) {
          return { ...payment, ...params.data };
        }
        return payment;
      });
      queryClient.setQueryData(["getPayments"], newPayments);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries("getPayments");
    },

    ...options,
  });
};
