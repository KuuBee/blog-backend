-- 文章类型
CREATE TYPE article_status AS ENUM ('release', 'disable');
CREATE TABLE article (
  article_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  article_link VARCHAR(1000) NOT NULL,
  tag_id INT NOT NULL,
  classification_id INT NOT NULL,
  status article_status NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP NOT NULL
);
CREATE TYPE classification_status as ENUM ('enable', 'disable');
CREATE TYPE tag_status as ENUM ('enable', 'disable');
CREATE TYPE user_status as ENUM ('enable', 'disable');
CREATE TYPE comment_status as ENUM ('enable', 'disable', 'under_review');
CREATE TYPE link_status as ENUM ('enable', 'disable', 'under_review');