import { setActivePinia, createPinia } from "pinia";
import {useUserStore} from "@/stores/user";

//error => in mock auth in firbase!!
////Firebase: Error (auth/missing-email).
// vi.mock("@/stores/user",  () =>  {
//      signInWithEmailAndPassword(auth,email,password)    
// });

describe("stores", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("authenticates user", async () => {
    const store = useUserStore();

    expect(store.userLoggedIn).not.toBe(true);
    await store.authenticate({});
    expect(store.userLoggedIn).toBe(true);
  });
});
