import { IApi, IError, IResultGetMany } from '@/interfaces/common';
import { IWeb, IWebCreateDto, IWebUpdateDto } from '@/interfaces/models';
import { UseMutateFunction } from '@tanstack/react-query';

export interface IWebResultApiGet extends IApi<IWeb> {
  isGettingWeb: boolean;
}

export interface IWebResultApiGetAll extends IApi<IResultGetMany<IWeb>> {
  isGettingWebs: boolean;
}

export interface IWebResultApiSearch extends IApi<IResultGetMany<IWeb>> {
  isSearchingWebs: boolean;
}

export interface IWebResultApiCreate extends IApi<IWeb> {
  createWeb: UseMutateFunction<IApi<IWeb>, IError, IWebCreateDto, unknown>;
  isCreatingWeb: boolean;
}

export interface IWebResultApiUpdate extends IApi<IWeb> {
  updateWeb: UseMutateFunction<
    IApi<IWeb>,
    IError,
    { webId: string; webUpdateDto: IWebUpdateDto },
    unknown
  >;
  isUpdatingWeb: boolean;
}

export interface IWebResultApiDelete extends IApi<IWeb> {
  deleteWeb: UseMutateFunction<IApi<IWeb>, IError, string, unknown>;
  isDeletingWeb: boolean;
}
