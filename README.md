<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://avatars3.githubusercontent.com/u/70510330?s=400&u=5f6cccf9943103932d329d622eb355d76e5ba7be&v=4" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">Helsinki API Event mobile app</h3>

  <p align="center">
    React Native Mobile App to explore events provided by Helsinki API
    <br />
  </p>
</p>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://avatars3.githubusercontent.com/u/70510330?s=400&u=5f6cccf9943103932d329d622eb355d76e5ba7be&v=4)


Helsinki API mobile app is a team project which we did at Haaga-Helia's Software project II -course 2020. We wanted to create a mobile application for people to find Helsinki's events and restaurants near by the event. Helsinki API mobile app is modern fullstack application that has been made for the users to use it on their mobile phones. 

With the application users can search events from Helsinki API by the name, by different tags. Users can also search event from eventlist page where is shown 100 events. User can navigate either to single events information page or to event's own webpage. At the single event's information page user can navigate to map to see where the event is located and user can also navigate to page where one can see list of restaurants near by the event. At that page user can also click to see the all the opening hours. From that page user can navigate to map where one can see the event and the restaurant on the map. 

REST API provided by city of Helsinki is used in this project. http://open-api.myhelsinki.fi/ and we are also using mapquest API https://developer.mapquest.com/documentation/. 

### Built With

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)
* [AWS](https://aws.amazon.com/)




<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To use the application you need to have installed the following:

- yarn
```bash 
npm install -g yarn
```
- expo CLI
```bash 
yarn global add expo-cli
```
- expo mobile app in your mobile device OR emulator
  See detailed Expo documentation from [https://expo.io/](https://expo.io/)

### Step 1

Clone or download this project

```bash
git clone https://github.com/Team-RyTy/tapahtuma-info.git
```

navigate to app's directory:

```bash
cd /path_to/tapahtuma.info
```

run

```bash
yarn install
expo start
```

### Step 2

Open app with your mobile device by reading the QR-code from expo CLI console or use an emulator.


## Getting Started with the Backend
Back-end was made with Amazon Web Servises.

[Python script](https://github.com/MarkkuMyllarinen/HelsinkiOpenAPI-AWS-Backend-Python-Scripts/blob/main/DataToS3.py) to pull data from Helsinki API to AWS S3 bucket

[Python script](https://github.com/MarkkuMyllarinen/HelsinkiOpenAPI-AWS-Backend-Python-Scripts/blob/main/S3ToAPI.py) to pull data from S3 and give it as response

### AWS Diagram
<img src="https://i.imgur.com/wxYOL6z.png" alt="Logo" width="500" height="500">

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

With the application users can search events from Helsinki API by the name, by different tags. Users can also search event from eventlist page where is shown 100 events. User can navigate either to single events information page or to event's own webpage. At the single event's information page user can navigate to map to see where the event is located and user can also navigate to page where one can see list of restaurants near by the event. At that page user can also click to see the all the opening hours. From that page user can navigate to map where one can see the event and the restaurant on the map.

## Homepage
<img src="https://i.imgur.com/wxYOL6z.png" alt="Logo" width="500" height="500">


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username
