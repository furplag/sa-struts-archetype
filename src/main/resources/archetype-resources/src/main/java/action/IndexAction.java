/*
 * Copyright 2014-2015 furplag and the Others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
package ${package}.action;

import javax.servlet.http.Cookie;

import jp.furplag.sastruts.extension.persistence.Anonymous;

import org.seasar.struts.annotation.Execute;
import org.seasar.struts.util.RequestUtil;
import org.seasar.struts.util.ResponseUtil;

public class IndexAction {

  @Anonymous
  @Execute(validator = false)
  public String index() {
    return "index.jsp";
  }

  @Anonymous
  @Execute(validator = false)
  public String logout() {
    if (RequestUtil.getRequest().getCookies() != null) {
      for (Cookie c : RequestUtil.getRequest().getCookies()) {
        c.setMaxAge(0);
        ResponseUtil.getResponse().addCookie(c);
      }
    }
    RequestUtil.getRequest().getSession(true).invalidate();

    return "/?redirect=true";
  }

  @Anonymous
  @Execute(validator = false)
  public String linear() {
    return "linear.jsp";
  }

  @Anonymous
  @Execute(validator = false)
  public String resuscitate() {
    return "resuscitate.jsp";
  }
}
