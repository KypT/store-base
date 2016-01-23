xml.instruct!
xml.urlset('xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9') {
  xml.url {
    xml.loc(root_url)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('monthly')
    xml.priority(1.0)
  }

  xml.url {
    xml.loc(store_path)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('daily')
    xml.priority(1.0)
  }

  xml.url {
    xml.loc(categories_path)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('weekly')
    xml.priority(0.8)
  }

  xml.url {
    xml.loc(specials_path)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('weekly')
    xml.priority(0.8)
  }

  xml.url {
    xml.loc(about_path)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('monthly')
    xml.priority(1.0)
  }

  xml.url {
    xml.loc(personal_order_path)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('monthly')
    xml.priority(0.3)
  }

  xml.url {
    xml.loc(payment_path)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('monthly')
    xml.priority(0.3)
  }

  xml.url {
    xml.loc(blog_path)
    xml.lastmod(Time.now.to_date)
    xml.changefreq('daily')
    xml.priority(0.5)
  }

  @articles.each do | article |
    xml.url {
      xml.loc(blog_article_path(article.id, article.url_title))
      xml.lastmod(article.updated_at.to_date)
      xml.changefreq('monthly')
      xml.priority(0.4)
    }
  end

  @collections.each do | collection |
    xml.url {
      xml.loc(category_url(collection))
      xml.lastmod(collection.updated_at.to_date)
      xml.changefreq('monthly')
      xml.priority(0.4)
    }
  end

  @specials.each do | special |
    xml.url {
      xml.loc(special_url(special))
      xml.lastmod(special.updated_at.to_date)
      xml.changefreq('monthly')
      xml.priority(0.4)
    }
  end

  @products.each do | product |
    xml.url {
      xml.loc(product_url(product))
      xml.lastmod(product.updated_at.to_date)
      xml.changefreq('weekly')
      xml.priority(0.9)
    }
  end
}