import { createAction, props } from '@ngrx/store';

export const PostPublishing = createAction('[POST] Post Publish Start', props<{ post: any, sid: string, sname: string }>());
export const PostPublished = createAction('[POST] Post Published Successfully');
export const PostPublishFailed = createAction('[POST] Post Publish Failed', props<{ message: string }>());
