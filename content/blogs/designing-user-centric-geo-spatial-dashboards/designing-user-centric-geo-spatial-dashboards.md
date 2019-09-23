---
date: 2019-09-04T04:54:53Z
slug: /building-geo-spatial-dashboards-user-centric-design
tags:
- UX
- Frontend
- vue
- map
title: Building complex geo-spatial dashboards with user centric design
description: Dashboards are complex screens with tons of information thrown at a user.
  See how we built a complex dashboard with iterative research and designs.
cover_image: ./work_overtime_2x.jpg
published: false

---

Having an overall view of your business, or system can give you a lot of insight about how well each part of your system is performing. This helps business users or anyone associated to take quick and strategic decisions. Dashboards and dashboarding tools isn't just a magic wand for a particular field, it is a general solution for most of the **visibility problems** exist in any organisation, business or system. From monitoring the status of space crafts using live dashboards to tiny dashboards within apps that shows your daily calories burned, they are everywhere!

**What makes a dashboard great?** Dashboards help users to answer the three of four **W**s of information. The What, When and Where. The "Why" of the information is upto the user to figure out since it requires logical reasoning and a bit of intelligence. If a dashboard can convey the overall status of your system with all the three **W**s, we can say it did a good job. But, Throwing bars and pies at a user with a ton of numbers within a single screen doesn't sound like a "Great Job". Unfortunately, most of the dashboards today looks like the 90's retro consoles with neumerous widgets and graphs which makes it really difficult to grasp the overall information about your system **at a glance**.

## Geo-Spatial Dashboards

It's a type of dashboard which has a Place and Time component to convey information. Think about it from a delivery comapny's perspective, they use these dashboards to see where their delivery partners and how well they are performing. Or, GeoSpatial dashboards which helps in displaying the weather and natural disaster areas over time. These aren't mainstream dashboards, becasue these dashboards require large amount of data to be displayed in the Map or a timeline, they become bulky and heavy. The main focus on these type of dashboards are on the **Location component (Maps)** and **Time component (Timeline)**. These two components are interconnected to give the user a better idea about how geo properties change over time.

At [Locale.ai](https://locale.ai), we work extensively on building geo-spatial dashboards to help on-demand companies to have an overall view of their partners and assets on ground in realtime. One of the biggest challenges while building these dashboards are the large amount of information associated to each other to be displayed on the screen. Considering the two major components of a geo-spatial dashboards as a Map and a Timeline, it is a challenging task to find **screen space** to accomodate all the tiny widgets which shows one or the other **Key Performance Indicators (KPIs)** of the client's company.

## Designing the dashboard

Maps are at the heart of geo-spatial dashboards and are considered to be as of high priority when allocating screen-space, next comes the timeline and then all other widgets. Initially our designs were inspired by some of the well known geo-spatial visualisation platforms like [Kepler](https://kepler.gl) and [Carto](https://carto.com), but we found a lot of limitations while analysing each of these platforms. 

<Img src="./kepler-gl.png"/>
<center>Kepler.gl GeoSpatial visualisation</center>

Kepler has one of the well polished interface, even tho it is an opensource project. All credits for the uber engineers!. From a business user's perspective the one-more-click away filters view and the disconnected timeline view was enough to reconsider a better way to build a geospatial dashboard. Adding to that, kepler doesn't provide out of the box options to view other metrics or connect your database for any heavy visualisation. Everything is done using a user supplied CSV file. Kepler gave us a fine grain understanding of the controls and visualisations required for any geospatial dashboard.