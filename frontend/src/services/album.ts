import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TAlbum, TAlbumsQueries, TAlbumsRes } from '@/types/album';

const postAlbum = async (album: TAlbum, config?: any): Promise<AxiosResponse<TAlbum>> =>
	api.post<TAlbum>('/albums', album, config);

const getAlbums = async (
	queries?: TAlbumsQueries,
	config?: any
): Promise<AxiosResponse<TAlbumsRes>> =>
	api.get<TAlbumsRes>(
		`/albums?offset=${queries?.offset || 0}&limit=${queries?.limit || 20}`,
		config
	);

const getAlbum = async (id: number | string, config?: any): Promise<AxiosResponse<TAlbum>> =>
	api.get<TAlbum>(`/albums/${id}`, config);

const putAlbum = async (id: number, body: any, config?: any): Promise<AxiosResponse<TAlbum>> =>
	api.put<TAlbum>(`/albums/${id}`, body, config);

const deleteAlbum = async (id: number, config?: any): Promise<AxiosResponse<TAlbum>> =>
	api.delete<TAlbum>(`/albums/${id}`, config);

const deleteAlbumImage = async (
	id: number,
	imageId: number,
	config?: any
): Promise<AxiosResponse<TAlbum>> => api.delete<TAlbum>(`/albums/${id}/images/${imageId}`, config);

export { deleteAlbum, deleteAlbumImage, getAlbum, getAlbums, postAlbum, putAlbum };
