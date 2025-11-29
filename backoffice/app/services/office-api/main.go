package main

import (
	"fmt"
	"os"
	"time"

	"github.com/aforamitdev/backoffice/backoffice/app/services/storage"
	"github.com/ardanlabs/conf"
)

var build = "develop"

func main() {

	storage, err := storage.NewBackOfficeStorage()
	if err != nil {
		os.Exit(1)
	}

	if err = run(storage); err != nil {

		os.Exit(1)
	}

}

func run(storage *storage.BackOfficeStorage) error {

	cfg := struct {
		conf.Version
		Web struct {
			APIHost         string        `conf:"default:localhost:9000"`
			DebugHost       string        `conf:"default:0.0.0.0:9001"`
			ShutdownTimeout time.Duration `conf:"default:20s"`
		}
		DB struct {
			ProductImages string `conf:"default:product-images.json"`
			ImageGroups   string `conf:"default:image-groups.json"`
			Host          string `conf:"default:localhost"`
			Name          string `conf:"default:postgres"`
			MaxIdleConns  int    `conf:"default:0"`
			MaxOpenConns  int    `conf:"default:0"`
			DisableTLS    bool   `conf:"default:true"`
		}
	}{
		Version: conf.Version{
			SVN:  build,
			Desc: "Katana Mock server",
		},
	}
	fmt.Println(cfg)

	err := storage.StartDBUi()
	if err != nil {
		os.Exit(1)
	}
	return err

}
