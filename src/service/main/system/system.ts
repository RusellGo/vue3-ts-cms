import { rlRequest } from '@/service';
import { IDataType } from '@/service/types';

export function getPageListData(url: string, queryInfo: any) {
  return rlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}
