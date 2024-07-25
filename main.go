package main

import (
	"fmt"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/go-rod/rod"
)

func main() {

	page := rod.New().MustConnect().MustPage("https://www.screener.in/company/SBIN/")
	html, err := page.MustWaitLoad().HTML()
	if err != nil {
		fmt.Println(err)
	}
	htmlr := strings.NewReader(html)
	doc, err := goquery.NewDocumentFromReader(htmlr)

	if err != nil {
		fmt.Println(err)
	}

	topRatios := doc.Find("#top-ratios").Children()

	fmt.Println(topRatios.Nodes)
	for node := range topRatios.Nodes {
		do := goquery.NewDocumentFromNode(topRatios.Nodes[node])
		fmt.Println(do.Find("li .value > .number").Text())
		fmt.Println(do.Find("li .name").Text())
		// fmt.Println(topRatios.Nodes[node].Type)
	}

	if err != nil {
		fmt.Println("Error null")
	}
}
