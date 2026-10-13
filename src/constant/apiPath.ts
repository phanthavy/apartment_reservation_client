export const apipath = {
  login: "/login",
  apartments: "/apartments",
  myApartments: "/apartments/mine",
  apartmentStatus: (id: number) => `/apartments/${id}/status`,
  uploadSignature: "/uploads/signature",
};
