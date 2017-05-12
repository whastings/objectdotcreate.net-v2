// @flow
import type { Post } from 'posts/types';
import './styles.scss';
import React from 'react';
import SafeOutput from 'app/utils/components/SafeOutput';
import SocialLinks from 'home/components/SocialLinks';
import profiler from 'app/utils/components/profiler';
import { PostList } from 'posts/components';

export function HomePage({ content, posts } : { content: string, posts: Array<Post> }) {
  return (
    <div className="home-page" id="home-page-content">
      <section className="home-about-me">
        <div className="card">
          <SafeOutput content={content} className="content"/>
          <SocialLinks/>
        </div>
      </section>
      <section className="home-recent-posts">
        <h2 className="section-title">Recent Posts</h2>
        <PostList posts={posts}/>
      </section>
    </div>
  );
}

export default profiler(HomePage);
