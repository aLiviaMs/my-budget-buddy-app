import { ISignInDTO, ISignInResponseDTO } from '../../common/DTOs';

// TODO: fix me and put actually api call
async function signIn({email, password}: ISignInDTO): Promise<ISignInResponseDTO> {
  return new Promise( (resolve, reject)  => {
    setTimeout(() => {
      console.log({email, password});
      if(password === '123456') {
        resolve({
          accessToken: 'aksjldha',
        });

        return;
      }

      reject(new Error());
    }, 500);
  });
}

export const authAPI = { signIn };
