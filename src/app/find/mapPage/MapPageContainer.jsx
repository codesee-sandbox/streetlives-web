/* eslint-disable no-console */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import { getTaxonomy } from '../../../services/api';
import MapPage from './MapPage';
import { selectableCategoryNames } from '../categories';
import analytics from '../../../services/analytics';

class MapPageContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { search } = nextProps.location;
    const { prevSearch } = prevState;
    if (search !== prevSearch) {
      return {
        eligibilityParams: qs.parse(search, { ignoreQueryPrefix: true }),
        prevSearch: search,
      };
    }

    return null;
  }

  state = {
    categories: null,
    eligibilityParams: {},
    prevSearch: null,
  };

  getCategoryUrl = category => `/find/${category.name}/questions`;

  goHome = () => this.props.history.push('/find');

  goToCategoryResults = category =>
    this.props.history.push(`/find/${category.name}${this.props.location.search}`);

  goToCategory = category =>
    this.props.history.push(`/find/${category.name}/questions`);

  goToLocationDetails = (locationId) => {
    const { categoryName } = this.props.match.params;
    const url = categoryName ?
      `/find/${categoryName}/location/${locationId}` :
      `/find/location/${locationId}`;

    analytics.track('Location Clicked', { locationId, url, categoryName });

    this.props.history.push(url);
  }

  fetchCategories = () => {
    // TODO: Use an action and put categories in Redux state.
    getTaxonomy()
      .then((taxonomy) => {
        const categories = taxonomy
          .map(category => ({
            ...category,
            index: selectableCategoryNames.indexOf(category.name.trim().toLowerCase()),
          }))
          .filter(({ index }) => index !== -1)
          .sort((category1, category2) => category1.index - category2.index);

        this.setState({ categories });
      })
      .catch(e => console.error('Error fetching taxonomy', e));
  };

  render() {
    const { categoryName } = this.props.match.params;
    const { categories, eligibilityParams } = this.state;
    const category = categories && categories.find(c => c.name === categoryName);

    return (
      <MapPage
        category={category}
        categories={categories}
        eligibilityParams={eligibilityParams}
        fetchCategories={this.fetchCategories}
        goHome={this.goHome}
        goToCategory={this.goToCategory}
        getCategoryUrl={this.getCategoryUrl}
        startQuestionFlow={this.startQuestionFlow}
        goToLocationDetails={this.goToLocationDetails}
      />
    );
  }
}

export default withRouter(MapPageContainer);
